# Tim Barry-Woods Portfolio Site (GitHub Pages)

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

This is a Jekyll-based GitHub Pages portfolio site using the Cayman theme. The site showcases Tim Barry-Woods' professional profile as a .NET developer with custom HTML content and automated GitHub Pages deployment.

## Working Effectively

### Bootstrap and Setup (First Time)
Run these commands to set up the development environment from a fresh clone:

- `ruby --version` -- Verify Ruby 3.2+ is available
- `gem --version` -- Verify gem package manager is available  
- `cd [repo-root]`
- `gem install --user-install bundler` -- Install Bundler package manager. Takes ~5 seconds. NEVER CANCEL.
- `export PATH="/home/runner/.local/share/gem/ruby/3.2.0/bin:$PATH"` -- Add gem executables to PATH
- `bundle config set path 'vendor/bundle'` -- Configure local gem installation
- `bundle install` -- Install Jekyll and dependencies. Takes ~30 seconds first time. NEVER CANCEL.
- `bundle exec jekyll build` -- Build the site. Takes ~0.6 seconds. Set timeout to 10+ seconds minimum.

### Build and Serve the Site
- ALWAYS run the bootstrap steps first before building if working from a fresh clone.
- ALWAYS ensure gem executables are in PATH: `export PATH="/home/runner/.local/share/gem/ruby/3.2.0/bin:$PATH"`
- Build: `bundle exec jekyll build` -- Takes ~0.6 seconds. NEVER CANCEL. Set timeout to 10+ seconds minimum.
- Serve locally: `bundle exec jekyll serve --host 0.0.0.0 --port 4000` -- Takes ~1 second to start. NEVER CANCEL. Set timeout to 30+ seconds for startup.
- Access at: http://localhost:4000

### Key Timing Expectations
- **Bundler install**: 5 seconds first time. NEVER CANCEL. Set timeout to 30+ seconds.
- **Bundle install**: 30 seconds first time. NEVER CANCEL. Set timeout to 60+ seconds.
- **Jekyll build**: 0.6 seconds. NEVER CANCEL. Set timeout to 10+ seconds minimum.
- **Jekyll serve**: 1 second startup. NEVER CANCEL. Set timeout to 30+ seconds for startup.
- **Site generation**: Nearly instantaneous due to simple structure.

## Validation

### Manual Validation Requirements
After making any changes, ALWAYS run through this complete validation:

1. **Build Test**: `bundle exec jekyll build` -- Must complete without errors
2. **Serve Test**: `bundle exec jekyll serve --host 0.0.0.0 --port 4000` -- Must start successfully  
3. **Browser Test**: Navigate to http://localhost:4000 and verify:
   - Site loads completely with proper styling
   - Header shows "Tim Barry-Woods" and subtitle
   - Three main sections display: About Me, Projects, Contact
   - All text content is readable and properly formatted
   - Cayman theme styling is applied correctly
   - No broken layout or missing CSS

### Repository Structure Validation
Verify these key files exist and serve their purpose:
- `index.html` -- Main portfolio content (custom HTML, not Jekyll markdown)
- `_config.yml` -- Jekyll configuration with theme: jekyll-theme-cayman
- `CNAME` -- Custom domain: timbarrywoods.dev
- `assets/css/style.scss` -- SCSS entry point importing Cayman theme
- `images/` -- Portfolio images directory
- `Gemfile` -- Ruby dependencies (Jekyll 4.4+, jekyll-theme-cayman)

## Common Tasks

### Repository Structure
```
/home/runner/work/timjamwoo.github.io/timjamwoo.github.io/
├── index.html                 # Main portfolio page (custom HTML content)
├── README.md                  # GitHub Pages documentation  
├── _config.yml               # Jekyll config: theme: jekyll-theme-cayman
├── CNAME                     # Custom domain: timbarrywoods.dev
├── assets/css/style.scss     # SCSS entry point
├── images/                   # Portfolio images
├── Gemfile                   # Ruby dependencies
├── .gitignore               # Excludes _site/, vendor/, etc.
└── .github/                 # GitHub configuration
```

### Content Overview
- **Site Type**: Professional portfolio/landing page for Tim Barry-Woods
- **Technologies**: Jekyll 4.4+, Ruby 3.2+, Sass, HTML5, CSS3
- **Theme**: jekyll-theme-cayman (GitHub Pages compatible)
- **Content**: Custom HTML in index.html (not typical Jekyll posts/pages)
- **Sections**: About Me, Projects (Vault App, LyrIQ), Contact information
- **Domain**: Custom domain timbarrywoods.dev via CNAME file

### Development Notes
- This is NOT a typical Jekyll blog -- it's a single-page portfolio with custom HTML
- Content changes should be made in `index.html`, not in Jekyll posts or pages  
- The site uses the Cayman theme for styling but has custom HTML content
- GitHub Pages automatically deploys from the main branch
- No tests, linting, or CI workflows are configured beyond GitHub Pages deployment
- Build process is very fast due to simple structure (single page + assets)

### Dependencies
- **Ruby**: 3.2.3+ (system Ruby is fine)
- **Jekyll**: 4.4.1+ (installed via Bundler)
- **Theme**: jekyll-theme-cayman 0.2.0
- **Bundler**: For Ruby gem management
- **Sass**: For CSS preprocessing (includes deprecation warnings, can be ignored)

### Troubleshooting
- If `bundle` command not found: Install bundler first with `gem install --user-install bundler`
- If gems aren't found after bundler install: Add gem executables to PATH with `export PATH="/home/runner/.local/share/gem/ruby/3.2.0/bin:$PATH"`
- If gems aren't found after bundle install: Run `bundle install` first
- If Jekyll command fails: Use `bundle exec jekyll [command]` instead of direct jekyll commands
- If permissions error during gem install: Use `gem install --user-install` flag
- Build shows Sass deprecation warnings: These are from the theme and can be ignored
- For GitHub Pages compatibility: Stick to GitHub Pages supported gems

### File Modification Guidelines  
- **Content changes**: Edit `index.html` directly (custom HTML content)
- **Styling changes**: Modify `assets/css/style.scss` or add custom CSS
- **Site config**: Update `_config.yml` for Jekyll settings
- **Domain changes**: Update `CNAME` file
- **Dependencies**: Update `Gemfile` for gem changes

### GitHub Pages Deployment
- Deployment is automatic on push to main branch
- No manual deployment steps required
- Site deploys to both github.io URL and custom domain
- Build logs available in GitHub Actions (Pages build and deployment)