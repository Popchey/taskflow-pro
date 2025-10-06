#!/bin/bash

case "$1" in
  start)
    echo "🚀 Starting development services..."
    brew services start postgresql@15
    brew services start redis
    echo "✅ Services started!"
    brew services list
    ;;
  stop)
    echo "🛑 Stopping development services..."
    brew services stop postgresql@15
    brew services stop redis
    echo "✅ Services stopped!"
    brew services list
    ;;
  status)
    echo "📊 Service status:"
    brew services list
    ;;
  restart)
    echo "🔄 Restarting services..."
    brew services restart postgresql@15
    brew services restart redis
    echo "✅ Services restarted!"
    ;;
  *)
    echo "Usage: ./dev-services.sh {start|stop|status|restart}"
    exit 1
    ;;
esac
