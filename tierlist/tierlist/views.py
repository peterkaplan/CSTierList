from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from utils import *

import json

 

@api_view(['GET'])
def dump_db(request):
	"""
		Called from main view. Returns a list of company objects.
	"""
	# Get and search for client ip in database.
	client_ip = get_client_ip(request)			# TODO: Check type coersion.
	user_profile = Profile.objects.filter(ip = client_ip)

	# Build and serialize company object.
	company_json_list = []
	companies = Company.objects.all()
	for company in companies:
		company_json = company_serializer(company)
		if user_profile:
			i_voted = Vote.object.filter(pid = user_profile.pk, cid = company.pk)
			if i_voted:
				company_json.append({"upvote" : i_voted.upvote})
	
		company_json_list.append(company_json)
	
	return json.dumps(company_json_list)

