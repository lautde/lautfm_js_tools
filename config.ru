# rackup [--port PORT]

root=Dir.pwd
puts ">>> Serving: #{root} (default port is 9292; specify another one like --port 3456)"
run Rack::Directory.new("#{root}")