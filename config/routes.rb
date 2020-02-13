Rails.application.routes.draw do
  resources :posts
  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  root 'welcome#welcome'
  match '/profile/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup_
  get 'welcome/menu' => 'welcome#menu', :as => :welcome_menu
  get 'sessions/new' => 'sessions#new'
  get 'welcome/event' => 'welcome#event', :as => :welcome_event
  get 'welcome/mypage' => 'welcome#mypage', :as => :mypage
  get '/auth/kakao/callback' => 'welcome#welcome'
  get 'users/sign_in' => 'users#sign_in', :as => :new_users_session_path

end
