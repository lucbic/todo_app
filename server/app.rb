require_relative 'config/environment'

set :port, 9393
# set :environment, :production

class Todo < ActiveRecord::Base

end

class App < Sinatra::Base

  # CREATE
  post '/todo' do
    content_type :json
    @data = JSON.parse(request.body.read)
    @todo = Todo.new(@data)
    if @todo.save
      @todo.to_json
    else
      halt 422
    end
  end

  #READ
  get '/todos' do
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
      halt 422
    end
  end

  #DELETE
  delete '/todo/:id' do
    content_type :json
    @todo = Todo.find(params[:id].to_i)
    if @todo.destroy
      {:success => "ok"}.to_json
    else
      halt 422
    end
  end
end
