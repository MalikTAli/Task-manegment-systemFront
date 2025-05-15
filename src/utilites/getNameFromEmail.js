export function getNameFromEmail(email) {
  return email.split('@')[0]; // أخذ الاسم قبل '@'
}