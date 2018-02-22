from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def dump_db(request):

@api_view(['POST'])
def vote(request):
	body_unicode = request.body.decode('utf-8')
    data = json.loads(body_unicode)

    vote_type = data['vote_type']
    company = data['cid']
    ip = data['ip']

    company = Company.objects.filter(pk=company)

    # Check that company exists
    if company[0] == None
    	return Response(status=status.HTTP_400_BAD_REQUEST)

    # Save IP address to new profile object if not already in DB
    if !Profile.objects.filter(ip=ip).exists():
    	new_profile = Profile(ip=ip)
    	new_profile.save()

   	user = Profile.objects.get(ip=ip)

    vote = Vote.objects.filter(pid=user.pk, cid=company)

    # Handle vote not exist in db
	if vote[0] == None    	
   		user_vote = Vote(Profile.objects.get(ip=ip).pk, company, vote_type)
   		user_vote.save()

   		if vote_type:
   			company.count += 1
   		else:
   			company.count -= 1

   		company.save()

   	else:
   		if vote.pid == user.pk or vote_type == vote.upvote:
   			# Already voted or made the same vote -- nop
   			return Response({'message': 'You have already voted.'}, status=status.HTTP_200_OK)

   		if vote_type == True:
   			company.count += 2
   		else 
   			company.count -= 2

   		company.save()

   	return Response({'message': 'Thank you for your vote!'}, status=status.HTTP_200_OK)






