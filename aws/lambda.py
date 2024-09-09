import json
import boto3

region_name = "ap-south-1"

def lambda_handler(event, context):
    ec2 = boto3.resource("ec2", region_name)
    client = boto3.client("ec2", region_name)

    filter_ec2 = {"Name":"tag:Env", "Values":["Test"]}
    tag_instances = ec2.instances.filter(Filters=[filter_ec2])
    instances = []
    for each in tag_instances:
        instances.append(each.id)
        print(each.id)

    status = client.describe_instance_status(InstanceIds = instances, IncludeAllInstances = True)
    # print(status)
    for i in status["InstanceStatuses"]:
        # print(i)
        status=i["InstanceState"]["Name"]
        if(status=="running"):
            client.stop_instances(InstanceIds= [i["InstanceId"]])
            print(f"stopping instance {i["InstanceId"]}")
        elif(status=="stopped"):
            client.start_instances(InstanceIds= [i["InstanceId"]])
            print(f"starting instance {i["InstanceId"]}")