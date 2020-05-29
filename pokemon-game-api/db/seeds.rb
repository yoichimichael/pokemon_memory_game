# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

User.destroy_all
Score.destroy_all

5.times do 
  User.create(username:Faker::Name.first_name) 
end

20.times do
  Score.create(score: rand(11), user_id: User.all.sample.id)
end