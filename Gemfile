source "https://rubygems.org"

gem "rails", "~> 4.0.0"

# required by newrelic_api gem
gem "activeresource", "~> 4.0.0"

gem "sass-rails", "~> 4.0.0"
gem "bootstrap-sass", "~> 2.3.2"
gem "bootswatch-rails"

gem "pg"

# on windows replace with thin gem
gem "unicorn"

gem "faraday"
gem "faraday_middleware"
gem "multi_xml"
gem "libxml-ruby"

# see app/model/sources/number/jenkins_game.rb
gem "nokogiri"

# see app/model/sources/number/new_relic.rb
gem "newrelic_api"

# assets
gem "therubyracer"
gem "uglifier"

group :test, :development do
  gem "debugger"
  gem "rspec-rails"
  gem "factory_girl_rails"
  gem "mocha", :require => false
end

group :development do
  gem "better_errors"
  gem "binding_of_caller"
  gem "foreman"
end

gem 'rails_12factor', group: :production
