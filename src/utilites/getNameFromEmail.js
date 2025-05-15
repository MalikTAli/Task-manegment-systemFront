export function getNameFromEmail(email) {
  if (!email || typeof email !== "string") return "Unknown";
  const name = email.split("@")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
}