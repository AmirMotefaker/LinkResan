package services

import (
    "github.com/AmirMotefaker/LinkResan/backend/internal/models"
    "github.com/AmirMotefaker/LinkResan/backend/internal/repositories"
)

type DomainService interface {
    CreateDomain(domain *models.CustomDomain) error
    GetUserDomains(userID uint) ([]models.CustomDomain, error)
    DeleteDomain(userID uint, domainID uint) error
}

type domainService struct {
    domainRepo repositories.DomainRepository
}

func NewDomainService(domainRepo repositories.DomainRepository) DomainService {
    return &domainService{domainRepo: domainRepo}
}

func (s *domainService) CreateDomain(domain *models.CustomDomain) error {
    return s.domainRepo.Create(domain)
}

func (s *domainService) GetUserDomains(userID uint) ([]models.CustomDomain, error) {
    return s.domainRepo.FindByUserID(userID)
}

func (s *domainService) DeleteDomain(userID uint, domainID uint) error {
    return s.domainRepo.DeleteByIDAndUserID(domainID, userID)
}