exports.createUserSql = "INSERT INTO user (fullname, age, username, password, salt, isAdmin) VALUES "
exports.getTypesSql = "SELECT * FROM types";
exports.getPrioritiesSql = "SELECT * FROM priority";
exports.getStagesSql = "SELECT * FROM stages";
exports.createTokenSql = "INSERT INTO user_tokens (user_id, token, expiry_time) VALUES ";
exports.createTaskSql = "INSERT INTO tasks (name, typeID, stageID, priorityID, description, userId) VALUES ";
exports.assignTaskSql = "INSERT INTO user_tasks (taskID, userID) VALUES ";
exports.updateTaskSql = "UPDATE tasks SET ";
exports.getTokenSql = "SELECT * FROM user_tokens WHERE token = ";
exports.deleteTokenSql = "DELETE FROM user_tokens WHERE token = ";
exports.getTasksSql = "SELECT tasks.*, priority.name AS priority_name, types.name AS task_type_name, stages.name AS stage_name, user.username FROM tasks, priority, stages, types, user WHERE tasks.typeID = types.id AND tasks.stageID = stages.id AND priority.id = tasks.priorityID AND tasks.userId = user.id AND isDeleted = '0'";
exports.createPrioritySql = "INSERT INTO priority (name) VALUES ";
exports.getUserData = "SELECT * FROM user WHERE username = "
exports.getUserDataForToken = "SELECT user_tokens.*, user.isAdmin FROM user_tokens, user WHERE user.id = user_tokens.user_id AND token = "
exports.getUsersSql = "SELECT id, fullname, age, username, isAdmin FROM user";
exports.getTaskSql = "SELECT * FROM tasks WHERE id = "