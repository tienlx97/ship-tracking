import { existsSync } from "node:fs";
import { join } from "node:path";

import { getHealthStatus } from "@/lib/services/health.service";

const root = process.cwd();

describe("project structure", () => {
  it("contains the required source folders", () => {
    const requiredFolders = [
      "src/app",
      "src/components",
      "src/features",
      "src/lib/services",
      "tests",
    ];

    expect(requiredFolders.every((folder) => existsSync(join(root, folder)))).toBe(true);
  });

  it("contains the required configuration files", () => {
    const requiredFiles = [
      "package.json",
      "tsconfig.json",
      "next.config.ts",
      "postcss.config.mjs",
      "jest.config.ts",
    ];

    expect(requiredFiles.every((file) => existsSync(join(root, file)))).toBe(true);
  });

  it("exposes a shared service layer", () => {
    expect(getHealthStatus()).toEqual({
      service: "contract-builder",
      status: "ok",
    });
  });
});
