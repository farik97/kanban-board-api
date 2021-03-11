exports.createUserSql = "INSERT INTO user (fullname, age, username, password, salt) VALUES "
exports.getTypesSql = "SELECT * FROM types";
exports.getPrioritiesSql = "SELECT * FROM priority";
exports.getStagesSql = "SELECT * FROM stages";
exports.createTokenSql = "INSERT INTO user_tokens (user_id, token, expiry_time) VALUES ";
exports.createTaskSql = "INSERT INTO tasks (name, typeID, stageID, description) VALUES ";
exports.assignTaskSql = "INSERT INTO user_tasks (taskID, userID) VALUES ";
exports.updateTaskSql = "UPDATE tasks SET ";
exports.getTokenSql = "SELECT * FROM user_tokens WHERE token = ";
exports.deleteTokenSql = "DELETE FROM user_tokens WHERE token = ";
exports.getTasksSql = "SELECT * FROM tasks WHERE isDeleted = '0'";
exports.createPrioritySql = "INSERT INTO priority (name) VALUES ";