Rails.application.routes.draw do
  resources :posts
  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  root 'welcome#welcome'
  match '/profile/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup_
  get 'welcome/menu' => 'welcome#menu'
  get 'welcome/event' => 'welcome#event'
  get 'welcome/login' => 'welcome#login'
  get 'welcome/mypage' => 'welcome#mypage'
  #post 'home/index' => 'home#index'
  #get 'home/login' => 'home#login'
  #get 'home/create' => 'home#create'
  #post 'home/create' => 'home#create'
  #get 'home/read' => 'home#read'
  #get 'home/home/content/:post_id' => 'home#content'
  #get 'home/home/destroy/:post_id' => 'home#destroy'
  #get 'home/home/edit/:post_id' => 'home#edit'
  #post 'home/home/update/:post_it' => 'home#update'
end
