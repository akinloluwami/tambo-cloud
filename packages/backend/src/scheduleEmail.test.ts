import { operations } from "@tambo-ai-cloud/db";

// `scheduleEmail` is defined as part of the `operations` namespace
const { scheduleEmail } = operations;

describe("scheduleEmail", () => {
  it("should insert correct values", async () => {
    const insert = jest.fn().mockReturnThis();
    const values = jest.fn().mockReturnThis();
    const returning = jest.fn().mockResolvedValue([{ id: "ems_test" }]);
    const db: any = { insert, values, returning };

    const sendAt = new Date();
    await scheduleEmail(db, {
      to: "a@example.com",
      component: "followUpNoApiKey",
      props: { firstName: "Alice", dashboardUrl: "https://tambo.co" },
      sendAt,
    });

    // We only need to assert that `insert` was called; referencing the schema
    // object causes an ESM-related compile issue in the test environment.
    expect(insert).toHaveBeenCalled();
    expect(values).toHaveBeenCalledWith(
      expect.objectContaining({
        recipient: "a@example.com",
        component: "followUpNoApiKey",
        props: { firstName: "Alice", dashboardUrl: "https://tambo.co" },
        sendAt,
        status: "pending",
      }),
    );
    expect(returning).toHaveBeenCalled();
  });
});
