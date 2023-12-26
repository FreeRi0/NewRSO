import os
import sys

from django.core.wsgi import get_wsgi_application

try:
    sys.path.remove('/usr/lib/python3/dist-packages')
except:
    pass

sys.path.append('/root/public_html/')
sys.path.append('/root/myenv/lib/python3.10/site-packages/')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

application = get_wsgi_application()
