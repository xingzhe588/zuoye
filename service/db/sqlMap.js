var sqlMap = {
  user: {
    add: 'INSERT INTO user (username, email, password) VALUES (?,?,?)',
    select: 'SELECT * FROM user'
  },
  food: {
    list: 'SELECT * FROM foods'
  },
  food_detail: {
    getById: 'SELECT detail FROM food_detail WHERE food_id = ?'
  },
  user_likes: {
    add: 'insert into user_likes(user_email, food_id) values (?, ?)',
    remove: 'delete from user_likes where user_email = ? and food_id = ?',
    getByUser: 'select f.* from foods f inner join user_likes ul on f.id = ul.food_id where ul.user_email = ?',
    checkLike: 'select * from user_likes where user_email = ? and food_id = ?',
  }
}

module.exports = sqlMap;