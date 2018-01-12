require_relative 'config/environment'

PORT = 9393
set :port, PORT
# set :environment, :production


class Todo < ActiveRecord::Base

end

class App < Sinatra::Base
  get '/' do
    @todos = Todo.all()
    erb :index
  end

  post '/titles' do
    content_type :json
    titles = []
    @todos = Todo.all
    @todos.each { |t| titles << t.title }
    titles.to_json
  end

  post '/titles' do
    content_type :json
    titles = []
    @todos = Todo.all
    @todos.each { |t| titles << t.title }
    titles.to_json
  end

  # CREATE
  post '/todo' do
    content_type :json
    @data = JSON.parse(request.body.read)
    @todo = Todo.new(@data)
    if @todo.save
      @todo.to_json
    else
      halt 500
    end
  end

  #READ
  post '/todos' do
    content_type :json
    Todo.all.to_json
  end

  #UPDATE
  patch '/todo/:id' do
    content_type :json
    @data = JSON.parse(request.body.read)
    @todo = Todo.find(params[:id].to_i)
    if @todo.update(@data)
      @todo.to_json
    else
      halt 500
    end
  end

  #DELETE
  delete '/todo/:id' do
    content_type :json
    @todo = Todo.find(params[:id].to_i)
    if @todo.destroy
      {:success => "ok"}.to_json
    else
      halt 500
    end
  end
end

# Métodos exclusivos para testes no console

URL = "http://localhost:#{PORT}"

def get_todos
  response = RestClient.post "#{URL}/todos", {}
  puts response
end

def get_titles
  response = RestClient.post "#{URL}/titles", {}
  puts response
end

def create_todo(title, project, done)
  payload = {:title => title, :project => project, :done => done}
  encoded = JSON.generate(payload)
  response = RestClient.post "#{URL}/todo", encoded
  puts response
end

def delete_todo(id)
  response = RestClient.delete "#{URL}/todo/#{id}"
  puts response
end

def update_todo(id, title, project, done)
  payload = {:title => title, :project => project, :done => done}
  encoded = JSON.generate(payload)
  response = RestClient.patch "#{URL}/todo/#{id}", encoded
  puts response
end
