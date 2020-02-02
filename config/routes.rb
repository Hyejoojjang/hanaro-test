Rails.application.routes.draw do
  resources :posts
  devise_for :users
  root 'welcome#index'

  get 'home/index' => 'home#index'
  get 'home/login' => 'home#login'
  post 'diary' => 'home#diary'
  get 'home/create' => 'home#create'
  post 'home/create' => 'home#create'
  get 'home/read' => 'home#read'
  get 'home/home/content/:post_id' => 'home#content'
  get 'home/home/destroy/:post_id' => 'home#destroy'
  get 'home/home/edit/:post_id' => 'home#edit'
  post 'home/home/update/:post_it' => 'home#update'
  root 'home#index' 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end 
