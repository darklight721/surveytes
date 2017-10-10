Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api' do
    resources :surveys, only: [:show]
    resources :responses, only: [:create]

    namespace :admin do
      resources :registrations, only: [:create]
      resources :sessions, only: [:create]
      resources :surveys, only: [:index, :create]
      resources :responses, only: [:index]
    end
  end
end
