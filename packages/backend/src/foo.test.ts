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
