function isExpired(exp: number, iat: number): boolean {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Obtenir le timestamp actuel en secondes
  const tokenDuration = exp - iat; // Durée du token en secondes

  return currentTimestamp > exp || currentTimestamp < iat || tokenDuration <= 0;
}

export default isExpired;
