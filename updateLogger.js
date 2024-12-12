import fs from "fs/promises";
import path from "path";

const logDir = path.join(process.cwd(), "./logs");
const summaryFilePath = path.join(logDir, "summary.log");

// Function to count log levels in a file
const countLogLevels = async (filePath) => {
  const counts = { errors: 0, info: 0, total: 0 };

  try {
    const logData = await fs.readFile(filePath, "utf-8");
    const logLines = logData.split("\n").filter((line) => line.trim());

    logLines.forEach((line) => {
      if (line.includes("ERROR")) counts.errors++;
      if (line.includes("INFO")) counts.info++;
      if (line.includes("WARN")) counts.warn++;
      counts.total++;
    });

    return counts;
  } catch (error) {
    console.error(`Failed to read or process the log file: ${filePath}`);
    return null;
  }
};

// Function to update the summary file
export const updateSummaryFile = async () => {
  try {
    const logFiles = (await fs.readdir(logDir)).filter(
      (file) => file.endsWith(".log") && file !== "summary.log"
    );

    let summaryData = { updatedAt: new Date().toISOString(), logs: [] };

    // Load existing data from SummaryFile.log if it exists
    try {
      const fileContent = await fs.readFile(summaryFilePath, "utf-8");
      summaryData = JSON.parse(fileContent);
    } catch {
      // If the file doesn't exist or is invalid, start fresh
      summaryData = { updatedAt: new Date().toISOString(), logs: [] };
    }

    const fileSummaries = {};
    // Track already processed files
    summaryData.logs.forEach((summary) => {
      fileSummaries[summary.filename] = summary.total;
    });

    // Process log files
    for (const file of logFiles) {
      const filePath = path.join(logDir, file);
      const counts = await countLogLevels(filePath);

      if (counts) {
        if (!fileSummaries[file] || fileSummaries[file] !== counts.total) {
          fileSummaries[file] = counts.total;

          // Update or add the file summary
          const existing = summaryData.logs.find(
            (summary) => summary.filename === file
          );
          if (existing) {
            existing.errors = counts.errors;
            existing.info = counts.info;
            existing.warn = counts.warn;
            existing.total = counts.total;
          } else {
            summaryData.logs.push({
              filename: file,
              errors: counts.errors,
              info: counts.info,
              warn: counts.warn,
              total: counts.total,
            });
          }
        }
      }
    }

    // Update the timestamp
    summaryData.updatedAt = new Date().toISOString();

    // Write updated summary
    await fs.writeFile(summaryFilePath, JSON.stringify(summaryData, null, 2));
    console.log("Summary file updated with timestamp.");
  } catch (error) {
    console.error(`Failed to update summary file: ${error.message}`);
  }
};
