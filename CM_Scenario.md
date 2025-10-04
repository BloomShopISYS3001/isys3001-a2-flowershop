# Configuration Management Scenario

## Branch Strategy Design Rationale
- **Main branch**: Serves as the production release branch, ensuring code stability and deployability at all times.
- **Develop branch**: Integration branch for ongoing development, where feature branches merge their completed work.
- **Feature branches**: Individual branches for developing new features or fixing bugs, created from the develop branch and merged back after completion.

## Key Operation Records
| Operation Date | Operation Description |
| -------------- | --------------------- |
| 2025-09-01     | Initial project setup, created main branch and initialized basic website structure. |
| 2025-09-02     | Created develop branch, started developing homepage and product listing page. |
| 2025-09-03     | Developed shopping cart functionality in feature/cart branch, merged to develop after testing. |
| 2025-09-04     | Conducted final testing, merged develop branch into main branch, and prepared for deployment. |

## Configuration Management Tool Usage Instructions
- **Git**: Version control system used to manage code changes and branch operations.
- **GitHub**: Remote repository hosting platform used for code backup and collaboration.
- **GitHub Pages**: Service used for website deployment and hosting.

## Deployment Configuration
- GitHub Pages selected `main` branch/root directory for deployment.
- Changes take effect within 10 minutes after deployment.
- Online address: [GitHub Pages URL, e.g., https://bloomshopisys3001.github.io/isys3001-a2-flowershop/].