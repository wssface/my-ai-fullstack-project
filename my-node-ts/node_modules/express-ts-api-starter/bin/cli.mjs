#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getProjectName() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    return args[0];
  }
  return 'my-express-api';
}

function isValidProjectName(name) {
  return /^[a-z0-9-]+$/.test(name) && name.length > 0;
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }

  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and dist directories
      if (entry.name === 'node_modules' || entry.name === 'dist') {
        continue;
      }
      copyDirectory(srcPath, destPath);
    } else {
      // Skip certain files
      if (
        entry.name === 'package-lock.json' ||
        entry.name === '.env' ||
        entry.name === 'eslint-report.json'
      ) {
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function updatePackageJson(projectPath, projectName) {
  const packageJsonPath = path.join(projectPath, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Update package name
  packageJson.name = projectName;
  
  // Remove bin field if it exists (not needed in generated project)
  delete packageJson.bin;
  
  // Remove prepublishOnly script
  delete packageJson.scripts.prepublishOnly;
  
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf8'
  );
}

function createEnvFile(projectPath) {
  const envExamplePath = path.join(projectPath, '.env.example');
  const envPath = path.join(projectPath, '.env');

  if (fs.existsSync(envExamplePath) && !fs.existsSync(envPath)) {
    fs.copyFileSync(envExamplePath, envPath);
    log('✓ Created .env file from .env.example', 'green');
  }
}

function main() {
  log('\n🚀 Express TypeScript API Starter', 'bright');
  log('=====================================\n', 'cyan');

  const projectName = getProjectName();

  if (!isValidProjectName(projectName)) {
    log('❌ Error: Invalid project name!', 'red');
    log('   Project name should only contain lowercase letters, numbers, and hyphens.\n', 'yellow');
    process.exit(1);
  }

  const currentDir = process.cwd();
  const projectPath = path.join(currentDir, projectName);

  // Check if directory already exists
  if (fs.existsSync(projectPath)) {
    log(`❌ Error: Directory "${projectName}" already exists!`, 'red');
    log('   Please choose a different name or remove the existing directory.\n', 'yellow');
    process.exit(1);
  }

  log(`📦 Creating project: ${projectName}...\n`, 'blue');

  try {
    // Get the template directory (where this package is installed)
    const templateDir = path.resolve(__dirname, '..');

    // Create project directory
    fs.mkdirSync(projectPath, { recursive: true });
    log(`✓ Created directory: ${projectName}`, 'green');

    // Copy template files
    log('📋 Copying template files...', 'blue');
    
    // Copy src directory
    const srcDir = path.join(templateDir, 'src');
    if (fs.existsSync(srcDir)) {
      copyDirectory(srcDir, path.join(projectPath, 'src'));
      log('  ✓ Copied src/ directory', 'green');
    }

    // Copy scripts directory
    const scriptsDir = path.join(templateDir, 'scripts');
    if (fs.existsSync(scriptsDir)) {
      copyDirectory(scriptsDir, path.join(projectPath, 'scripts'));
      log('  ✓ Copied scripts/ directory', 'green');
    }

    // Copy configuration files
    const configFiles = [
      'tsconfig.json',
      'eslint.config.js',
      'jest.config.ts',
      '.env.example',
      '.gitignore',
      'README.md',
      'LICENSE',
    ];

    for (const file of configFiles) {
      const srcFile = path.join(templateDir, file);
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, path.join(projectPath, file));
        log(`  ✓ Copied ${file}`, 'green');
      }
    }

    // Update package.json
    updatePackageJson(projectPath, projectName);
    log('  ✓ Updated package.json', 'green');

    // Create .env file
    createEnvFile(projectPath);

    log('\n✅ Project created successfully!\n', 'green');

    // Next steps
    log('📝 Next steps:', 'bright');
    log(`   cd ${projectName}`, 'cyan');
    log('   npm install', 'cyan');
    log('   npm run dev', 'cyan');
    log('\n🎉 Happy coding!\n', 'green');

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    // Clean up on error
    if (fs.existsSync(projectPath)) {
      fs.rmSync(projectPath, { recursive: true, force: true });
    }
    process.exit(1);
  }
}

main();
