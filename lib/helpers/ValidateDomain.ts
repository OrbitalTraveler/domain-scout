export function ValidateDomain(domain: string): boolean {
  const pattern =
    /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
  return pattern.test(domain);
}
