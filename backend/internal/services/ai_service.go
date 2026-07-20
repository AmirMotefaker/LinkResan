package services

import (
    "bytes"
    "encoding/json"
    "errors"
    "io"
    "log"
    "net/http"
    "strings"
)

type AIService interface {
    SuggestSlug(originalURL string) (string, error)
}

type aiService struct {
    apiKey string
}

func NewAIService(apiKey string) AIService {
    return &aiService{apiKey: apiKey}
}

func (s *aiService) SuggestSlug(originalURL string) (string, error) {
    if s.apiKey == "" {
        return "", errors.New("AI service is not configured")
    }

    prompt := `You are an expert in SEO and URL shortening. 
    Analyze the following URL: ` + originalURL + `
    If the URL contains descriptive words (like blog posts or news), generate a single, short, catchy, and readable URL slug (3 to 5 words max, use kebab-case, english letters and numbers only).
    If the URL does NOT contain descriptive words (e.g., random IDs like YouTube, Instagram, or TikTok), generate a cool, generic 2-3 word slug related to "watch", "video", or "media".
    Return ONLY the slug itself, absolutely nothing else (no quotes, no markdown).`

    payload := map[string]interface{}{
        "contents": []map[string]interface{}{
            {
                "parts": []map[string]string{
                    {"text": prompt},
                },
            },
        },
    }
    jsonData, _ := json.Marshal(payload)

    url := "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + s.apiKey
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()

    // تغییر شد: خواندن بدینه پاسخ در صورت ارور
    if resp.StatusCode != http.StatusOK {
        body, _ := io.ReadAll(resp.Body)
        log.Printf("Gemini API Error: Status %d, Body: %s", resp.StatusCode, string(body))
        return "", errors.New("Gemini API Error: " + string(body))
    }

    var result map[string]interface{}
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return "", err
    }

    candidates, ok := result["candidates"].([]interface{})
    if !ok || len(candidates) == 0 {
        log.Printf("Gemini AI Error: No candidates. Response: %v", result)
        return "", errors.New("no response from AI")
    }

    candidate := candidates[0].(map[string]interface{})
    content, ok := candidate["content"].(map[string]interface{})
    if !ok {
        return "", errors.New("invalid AI content format")
    }

    parts, ok := content["parts"].([]interface{})
    if !ok || len(parts) == 0 {
        return "", errors.New("invalid AI parts format")
    }

    text, ok := parts[0].(map[string]interface{})["text"].(string)
    if !ok {
        return "", errors.New("invalid AI text format")
    }

    slug := strings.TrimSpace(text)
    slug = strings.Trim(slug, "\"'\n *`")
    slug = strings.ReplaceAll(slug, " ", "-")
    slug = strings.ToLower(slug)

    if slug == "" {
        return "", errors.New("AI returned empty slug")
    }
    
    return slug, nil
}