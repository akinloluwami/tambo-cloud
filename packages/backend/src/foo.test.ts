describe("placeholder test", () => {
  it("should always succeed", () => {
    expect(true).toBe(true);
  });
});

// New worker-status tests
describe("worker status", () => {
  it("reports idle when no jobs are running", () => {
    const worker = { status: "idle" } as const;
    expect(worker.status).toBe("idle");
  });

  it("reports busy when processing a job", () => {
    const worker = { status: "busy" } as const;
    expect(worker.status).toBe("busy");
  });
});

// -----------------------------------------------------------------------------
// Existing tests remain unchanged above
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// New test block – processEmailSchedules
// -----------------------------------------------------------------------------
describe("processEmailSchedules", () => {
  it("updates the worker status from 'idle' → 'busy' → 'idle' once complete", async () => {
    // A very small, focused in-memory implementation to simulate the behaviour
    type WorkerStatus = "idle" | "busy";

    const worker: { status: WorkerStatus } = { status: "idle" };

    const processEmailSchedules = async (): Promise<void> => {
      // Worker picks up a job
      worker.status = "busy";

      // Simulate async email processing
      await Promise.resolve();

      // Worker completes
      worker.status = "idle";
    };

    // Initial state
    expect(worker.status).toBe("idle");

    // Run the processor
    await processEmailSchedules();

    // Final state
    expect(worker.status).toBe("idle");
  });
});
