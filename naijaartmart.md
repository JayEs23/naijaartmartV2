# NaijaArtMart Implementation Plan & README

## Implementation Checklist

- [ ] Use NextAuth for session management and authentication flows
- [ ] Adhere to SOLID principles throughout the codebase
- [ ] Build all features as modular, reusable components
- [ ] Maintain clear parent-child component relationships to avoid large, monolithic files
- [ ] Reference and align with the provided API documentation ([API_REFERENCE.md](docs/API_REFERENCE.md))
- [ ] Reference and align with the provided UI templates (`binaseahtml/`)
- [ ] Separate concerns for all user categories (Admin, Issuer, Investor-Individual, Investor-Corporate)
- [ ] Implement registration and authentication flows first
- [ ] Ensure KYC and profile completeness checks before allowing transactions
- [ ] Use JWT tokens and secure session handling
- [ ] Provide user-friendly error handling and messaging
- [ ] Document all architectural and implementation decisions
- [ ] Regularly update this checklist and README as development progresses

---

## Overview

NaijaArtMart is a digital art exchange platform for the Nigerian market, supporting NFT minting, trading, and investment in artworks. The platform is built with a separation of concerns for different user categories (Admin, Issuer, Investor - Individual/Corporate) and leverages a modern UI based on the `binaseahtml` HTML templates.

This README outlines the implementation plan, feature set, and API integration points for all user categories, referencing the [API_REFERENCE.md](docs/API_REFERENCE.md) and the provided UI templates.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [User Categories & Features](#user-categories--features)
    - [Registration & Authentication](#registration--authentication)
    - [Issuer Features](#issuer-features)
    - [Admin Features](#admin-features)
    - [Investor Features (Individual & Corporate)](#investor-features-individual--corporate)
3. [UI/UX Approach](#uiux-approach)
4. [API Integration](#api-integration)
5. [Separation of Concerns](#separation-of-concerns)
6. [Development Phases](#development-phases)

---

## Project Structure

- **Frontend**: Based on `binaseahtml` templates (see `binaseahtml/`)
- **Backend**: Laravel API (see `docs/API_REFERENCE.md`)
- **Docs**: API, database, and setup documentation (see `docs/`)

---

## User Categories & Features

### 1. Registration & Authentication

**Relevant UI:** `signup.html`, `login.html`
**Relevant API:** `/api/v1/auth/register`, `/api/v1/auth/login`, `/api/v1/auth/forgot-password`, `/api/v1/auth/verify-email`

#### Features

- User registration (investor, issuer, admin, etc.)
- Email verification
- Login/logout
- Password reset
- Profile completion (required for all transactions)
- KYC flow (individual/corporate)

#### Implementation Notes

- Registration form adapts based on user type (investor/issuer/admin)
- KYC status and profile completeness are enforced before allowing transactions
- Use JWT tokens for authentication (see API docs)

---

### 2. Issuer Features

**Relevant UI:** `add-NFT.html`, `edit-profile-board.html`, `wallet-board.html`, `inventory.html`
**Relevant API:**

- Artwork management: `/api/v1/artworks` (CRUD)
- NFT minting: `/api/v1/blockchain/artworks/{artworkId}/mint`
- Wallet: `/api/v1/user/wallet`, `/api/v1/user/wallet/transactions`
- Profile: `/api/v1/user/profile`

#### Features

- Create, update, delete artwork listings
- Mint NFTs for artworks
- View and manage wallet balance/transactions
- Edit issuer profile
- View statistics (artworks, trades, deposits, withdrawals)

#### Implementation Notes

- Only users with `issuer` role can access these features
- Artwork creation requires KYC approval and profile completion
- NFT minting requires artwork approval

---

### 3. Admin Features

**Relevant UI:** Custom admin dashboard (to be designed, can extend dashboard templates)
**Relevant API:**

- User management: `/api/v1/admin/users`
- Artwork approval: `/api/v1/admin/artworks/{id}/approval`
- Trading parameters: `/api/v1/admin/trading-parameters`
- System statistics: `/api/v1/admin/statistics`

#### Features

- Approve/reject artworks
- Manage users (search, filter by type/status/KYC)
- Set global trading parameters (price change limits)
- View system-wide statistics

#### Implementation Notes

- Only users with `admin` role can access these endpoints
- Admin actions are logged for audit

---

### 4. Investor Features (Individual & Corporate)

**Relevant UI:** `explore-grid.html`, `item-details.html`, `wallet-board.html`, `inventory.html`, `edit-profile-board.html`
**Relevant API:**

- Artworks: `/api/v1/artworks`, `/api/v1/artworks/{id}`
- Orders: `/api/v1/orders`, `/api/v1/orders/{id}`
- Wallet: `/api/v1/user/wallet`, `/api/v1/user/wallet/transactions`, `/api/v1/payments/deposit`, `/api/v1/payments/withdraw`
- Portfolio: `/api/v1/websocket/portfolio-data`
- Notifications: `/api/v1/user/notifications`

#### Features

- Browse and search artworks (filter by artist, price, market type, etc.)
- Place buy/sell orders (primary/secondary market)
- View order book and recent trades
- Manage wallet (deposit, withdraw, view transactions)
- View and edit profile
- Receive and manage notifications
- Real-time updates via WebSocket (market data, portfolio, notifications)

#### Implementation Notes

- Investors must complete KYC (individual: ID docs, corporate: company docs)
- All transactions require profile, KYC, and bank account verification
- Corporate investors may have additional compliance steps

---

## UI/UX Approach

- All user-facing pages will be based on the `binaseahtml` templates for a modern, responsive experience
- Registration and login flows use `signup.html` and `login.html`
- Dashboard, wallet, and profile pages use the corresponding dashboard templates
- Admin dashboard will extend existing templates or use a new design for admin-specific features

---

## API Integration

- All API endpoints are documented in [API_REFERENCE.md](docs/API_REFERENCE.md)
- Use JWT tokens for authenticated requests (add `Authorization: Bearer {token}` header)
- Handle error responses and display user-friendly messages
- Enforce business logic (profile/KYC/bank account required for transactions)
- Use WebSocket endpoints for real-time features (market data, notifications, portfolio)

---

## Separation of Concerns

- **Frontend**: UI rendering, form validation, API calls, real-time updates
- **Backend**: Business logic, authentication, KYC, order matching, NFT minting, admin controls
- **User Roles**: Features and UI are conditionally rendered based on user role (admin, issuer, investor-individual, investor-corporate)

---

## Development Phases

1. **Setup & Theming**: Integrate `binaseahtml` templates, set up routing and authentication
2. **Core Flows**: Implement registration, login, profile, and KYC flows
3. **Issuer Module**: Artwork management, NFT minting, wallet integration
4. **Investor Module**: Art browsing, trading, wallet, notifications, real-time updates
5. **Admin Module**: User/artwork management, trading parameters, statistics
6. **Testing & QA**: End-to-end testing for all user flows and roles
7. **Deployment & Monitoring**: Production setup, monitoring, and support

---

## References

- [API_REFERENCE.md](docs/API_REFERENCE.md)
- [binaseahtml/](binaseahtml/) (UI templates)
- [README_DATABASE_STRUCTURE.md](docs/README_DATABASE_STRUCTURE.md)
- [PRD_LARAVEL_API_DEVELOPMENT.md](docs/PRD_LARAVEL_API_DEVELOPMENT.md)

---

For further details, see the full API documentation and UI templates.
