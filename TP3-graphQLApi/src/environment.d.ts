declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URL: string;
            PORT: number;
        }
    }
}
export { };
