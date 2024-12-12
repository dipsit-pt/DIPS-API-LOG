# 📜 DIPS-API-LOG

## 🌟 Overview

A reusable logger and log summary updater for Node.js projects. This package provides:

- 🏗️ **Structured Logging** with customizable levels and formats using [Winston](https://github.com/winstonjs/winston).
- 🔄 **Daily Log Rotation** to automatically manage log file size and history using [Winston-Daily-Rotate-File](https://github.com/winstonjs/winston-daily-rotate-file).
- 📊 **Log Summaries** that compile daily reports of errors, warnings, and informational logs into a `summary.log`.
- ⏰ **Optional Cron Support** for scheduling tasks with [Cron](https://github.com/kelektiv/node-cron).

## ✨ Features

- **Custom Logging:**: Easily log messages with different levels (`info`, `error`, `warn`).
- **Daily Log Rotation:**: Automatically rotates logs daily with configurable retention and size.
- **Log Summaries:**: Analyzes all log files and generates a summary with counts of log levels.
- **Flexible Integration:**: Designed to be imported and used in any Node.js project.

## 🚧 Installation

**📦 Add the Package**

- Add this package to your project directly from GitHub:

  ```bash
  pnpm add git+ssh://git@github.com/[github_name]/DIPS-API-LOG.git
  ```

- This command will:

1. Install the `DIPS-API-LOG` package.
2. Automatically install all required dependencies (e.g., `winston`, `winston-daily-rotate-file`)

## 🔐 Setting up SSH for Private Repositories

If you can't access the repository because it's private, follow these steps to configure SSH access:

### 1️⃣ Check if SSH is set up on your machine

- Run this command to see if you already have an SSH key:
  ```bash
  ls -al ~/.ssh
  ```
- Look for files like `id_rsa` or `id_ed25519`. If none exist, move to step 2.

### 2️⃣ Generate a new SSH key (if needed)

- Run this command (replace `your_email@example.com` with your GitHub email):
  ```bash
  ssh-keygen -t ed25519 -C "your_email@example.com"
  ```
- Press **Enter** to accept the default location for the key.

### 3️⃣ Add your SSH key to the SSH agent

- Run the following commands:
  ```bash
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_ed25519
  ```

### 4️⃣ Add the SSH key to GitHub

- Copy your SSH key to the clipboard:
  ```bash
  cat ~/.ssh/id_ed25519.pub
  ```
- Go to **GitHub > Settings > SSH and GPG keys > New SSH key**, and paste the key.

### 5️⃣ Test your SSH connection

- Run this command to test the connection:
  ```bash
  ssh -T git@github.com
  ```
- You should see:
  ```
  Hi <username>! You've successfully authenticated, but GitHub does not provide shell access.
  ```

### 6️⃣ Reinstall the package

- Run the installation command again:
  ```bash
  pnpm add git+ssh://git@github.com/[github_name]/DIPS-API-LOG.git
  ```

## 💻 Usage

### Import the Logger and Summary Updater

```bash
import { log, updateSummaryFile } from "@[dependency-name]";
```

### Log Messages

- Use the `log` function to log messages at different levels:

```bash
log("This is an info message", "info");
log("This is an error message", "error");
log("This is a warning message", "warn");
```

### Update the Log Summary

- Generate or update the summary file with the latest log counts:

```bash
await updateSummaryFile();
```

### Automate with a Cron Job

- You can schedule a cron job in your project to automate the `updateSummaryFile()` process. For example:

```bash
import { CronJob } from "cron";
import { updateSummaryFile } from "@your-username/api-log";

const job = new CronJob(
  "0 0 * * * *", // Run every hour at the start of the hour
  updateSummaryFile, // Call the log summary updater
  null,
  true // Start the job immediately
);
```

- This cron job will run updateSummaryFile() every hour, ensuring your log summaries are updated automatically.

## 📝 Example

### Sample Log Message

```bash
2024-12-11 14:30:45 INFO: This is an info message
2024-12-11 14:30:46 ERROR: This is an error message
2024-12-11 14:30:47 WARN: This is a warning message
```

### Sample Summary Log (`summary.log`)

```bash
{
  "updatedAt": "2024-12-11T16:20:31.123Z",
  "logs": [
    {
      "filename": "20241211.log",
      "errors": 1,
      "info": 1,
      "warn": 0,
      "total": 2
    }
  ]
}
```

## 📚 Dependencies

This package relies on the following modules:

- [**Winston**](https://github.com/winstonjs/winston): A versatile logging library for Node.js.
- [**Winston-Daily-Rotate-File**](https://github.com/winstonjs/winston-daily-rotate-file): A transport for rotating log files daily.
- **Cron (Optional)**:
  - [**Cron**](https://github.com/kelektiv/node-cron): A library for scheduling tasks in Node.js.
  - **Note**: This is optional. Only install if you want to schedule automated log summary updates or other tasks in your project.

Make sure these dependencies are properly installed when using the package.
