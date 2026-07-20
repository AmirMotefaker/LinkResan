package services

import (
    "bytes"
    "encoding/json"
    "errors"
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

    prompt := "You are an expert in SEO and URL shortening. Analyze the following URL and generate a single, short, catchy, and readable URL slug (3 to 5 words max, use kebab-case, english letters and numbers only). Just return the slug itself, nothing else.\nURL: " + originalURL

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

    if resp.StatusCode != http.StatusOK {
        return "", errors.New("failed to connect to AI service")
    }

    var result map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&result)

    candidates, ok := result["candidates"].([]interface{})
    if !ok || len(candidates) == 0 {
        return "", errors.New("no response from AI")
    }

    content := candidates[0].(map[string]interface{})["content"].(map[string]interface{})
    parts := content["parts"].([]interface{})
    text := parts[0].(map[string]interface{})["text"].(string)

    // پاکسازی متن از فاصله‌ها و کوتیشن‌ها
    slug := strings.TrimSpace(text)
    slug = strings.Trim(slug, "\"'\n ")
    
    return slug, nil
}