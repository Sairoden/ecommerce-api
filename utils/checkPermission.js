const checkPermission = (requestUser, resourceUserId) => {
  if (
    requestUser.role === "admin" ||
    requestUser.userId === resourceUserId.toString()
  )
    return true;

  return false;
};

module.exports = checkPermission;
