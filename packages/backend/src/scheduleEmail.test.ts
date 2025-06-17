import { scheduleEmail } from "@tambo-ai-cloud/db";
import { emailSchedules } from "@tambo-ai-cloud/db";

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

    expect(insert).toHaveBeenCalledWith(emailSchedules);
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
