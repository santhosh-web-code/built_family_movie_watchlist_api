export function authorizeModification(req, res, next) {
  const role = req.user?.role;
  const tokenUserId = String(req.user?.id);
  const requestedUserId = String(req.params.userId);

  if (
    role !== "parent" &&
    !(role === "child" && tokenUserId === requestedUserId)
  ) {
    return res.status(403).json({ error: "Access denied" });
  }

  next();
}
