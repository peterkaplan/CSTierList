from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tierlist.utils.utils import get_client_ip
from tierlist.models import *

import json

@api_view(['GET'])
def current_state(request):
    """
        Called from main view. Returns a list of company objects.
    """
    # Get and search for client ip in database.
    client_ip = get_client_ip(request)
    user_profile = Profile.objects.filter(ip = client_ip)
	
	# Don't have an account. Will likely be phased out once authentication is implemented.
	if not user_profile:
		return Response(status=status.HTTP_400_BAD_REQUEST)


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


@api_view(['POST'])
def vote(request):

    data = request.data    

    vote_type = data['vote_type']
    company = data['cid']
    ip = get_client_ip(request)     
    print (ip)
    print (company)
    print (vote_type)
    company = Company.objects.filter(pk=company)

    # Check that company exists
    if not company:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # Save IP address to new profile object if not already in DB
    if not Profile.objects.filter(ip=ip).exists():
        new_profile = Profile(ip=ip)
        new_profile.save()

    user = Profile.objects.get(ip=ip)

    v = Vote.objects.filter(pid=user.pk, cid=company[0])

    # Handle vote not exist in db
    if not v:   
        user_vote = Vote(Profile.objects.get(ip=ip).pk, company[0].pk, vote_type)
        user_vote.save()

        if vote_type:
            company[0].count += 1
        else:
            company[0].count -= 1

        company[0].save()

    else:
        print (v[0].upvote)
        if v[0].pid == user.pk or vote_type == v[0].upvote:
            # Already voted or made the same vote -- nop
            return Response({'message': 'You have already voted.'}, status=status.HTTP_200_OK)

        if vote_type == True:
            company[0].count += 2
        else: 
            company[0].count -= 2

        company[0].save()

    return Response({'message': 'Thank you for your vote!'}, status=status.HTTP_200_OK)


'''
{
"vote_type":true,
"cid":1
}
'''




