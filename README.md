# sc-slot-game-base

The codebase of Saba slot games

## Development Setup

### Pre-commit Hooks

This project uses Husky to run pre-commit hooks that ensure code quality:

- **Commit Message Validation**: Uses commitlint to enforce conventional commit format
- **Unit Tests**: Runs all unit tests before allowing commits

#### Commit Message Format

Follow the conventional commit format:

```
type(scope): description

Examples:
feat: add new feature
fix: resolve bug
docs: update documentation
test: add unit tests
```

#### Available Scripts

- `npm test` - Run unit tests
- `npm run commitlint` - Validate commit message format
- `npm run prepare` - Setup Husky hooks (runs automatically on install)

#### Skipping Hooks (if needed)

To skip pre-commit hooks in emergency situations:

```bash
git commit --no-verify -m "emergency fix"
```
