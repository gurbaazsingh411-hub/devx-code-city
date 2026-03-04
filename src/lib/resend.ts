// Stub — email sending disabled in showcase mode
export function getResend(): any {
    return {
        emails: {
            send: async () => ({ data: { id: "noop" }, error: null }),
        },
    };
}
