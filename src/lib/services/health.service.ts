export type HealthStatus = {
  service: string;
  status: "ok";
};

export function getHealthStatus(): HealthStatus {
  return {
    service: "contract-builder",
    status: "ok",
  };
}
