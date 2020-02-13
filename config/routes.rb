Rails.application.routes.draw do
  resources :posts
  devise_for :users, :controllers => { omniauth_callbacks: 'omniauth_callbacks' }
  root 'welcome#welcome'
  match '/profile/:id/finish_signup' => 'users#finish_signup', via: [:get, :patch], :as => :finish_signup_
  get 'welcome/event' => 'welcome#event', :as => :welcome_event
  get 'welcome/mypage' => 'welcome#mypage', :as => :mypage
  get '/auth/kakao/callback' => 'welcome#welcome'
  get 'welcome/login' => 'welcome#login'

end
