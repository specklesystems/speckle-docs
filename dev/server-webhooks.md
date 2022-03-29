# Webhooks

Webhooks allow you to subscribe to a stream's events and get notified of them in real time. You can then use this to trigger ci apps, automation workflows, and more! The world is your oyster. Let's have a quick look at how to work with them.

## Setting Up A Stream Webhook

On the sidebar of a stream,  you'll find a "⚙ Settings" button. Click this and head to the "Webhooks" tab to add webhooks to your stream.

![webhooks-settings](https://user-images.githubusercontent.com/7717434/126977638-67d2958c-12d2-40b2-aef3-da5a01451773.gif)

There are a few different fields to fill out when setting up a webhook:

- URL: The URL that will be sent `POST` requests when your webhook is triggered
- Description: Optional identifying text (will be shown when viewing all your webhooks in a list)
- Secret: An optional token that will help you verity that requests you receive are actually coming from the Speckle Server. Requests will be secured with an `X-WEBHOOK-SIGNATURE` which you can verify upon receiving.
- Triggers: The events you want to trigger the webhook
- Enabled: Toggle the webhook on and off

![webhook-edit](https://user-images.githubusercontent.com/7717434/126979041-ac01d1f7-e9d3-455c-ab4f-7154ab891a96.png)

Go back to the main "Webhooks" tab to view all the webhooks on the stream. Click on a webhook to open the edit menu. The symbol to the left to the description indicates the status of the last webhook request; hover over it to get more information. Here, the green ✔ indicates the last request was successfully sent. The grey circle with an ❕ indicates no requests have been sent yet (you've likely just created the webhook and none of the triggers have happened yet). If the last request failed, you will see a red ❌ which you can hover over to see the error message.

![webhook-list](https://user-images.githubusercontent.com/7717434/126981792-d1a66613-43d9-4992-a8e2-fe692b68198e.png)

You can of course also manage webhooks via the [GraphQL API](/dev/server-graphql-api) using the `webhookCreate`, `webhookUpdate`, and `webhookDelete` mutations. There is a `webhooks` field on the `stream` schema which you can query to get the webhooks for a stream and the `history` of previous requests.

## Receiving the Webhook
When the condition defined in the webhook definition is met, a `POST` request will be made to the provided URL.

The POST request will contain 1 string parameter, called `payload`, that is the JSON representation of the webhook payload.

::: tip Important note on the JSON encoding
The way of passing the POST parameter is `application/json`, and the parameter is again encoded as JSON for compatibility with various frameworks that don't handle nested json properties.
So the actual POST request body might look something like:
```
{"payload":"{\"streamId\":\"a35c7a8bdd\",\"userId\":\"bc4e472126\",\"activityMessage\":\"Stream metadata changed\", ...
```
:::

To ensure that only the configured Speckle Server will successfully call your publicly available webhook server, there is the `X-WEBHOOK-SIGNATURE` header that can be used to validate the authenticity of the call.
It is the sha256 HMAC on the payload json string, using the shared secret configured on the webhook.
Example python code to validate the signature:
```python
import hmac
# ...

expected_signature = hmac.new(SHARED_SECRET.encode(), payload_json.encode(), 'sha256').hexdigest()
if not hmac.compare_digest(expected_signature, SIGNATURE_FROM_HEADER):
    print('Ignoring request with invalid signature')
    return
```

## The Webhook Payload

Here is an example of what a webhook payload looks like. The structure will always be the same, except for the `["event"]["data"]` which will change depending on the event that triggered the request.

```json
{
    "streamId": "48364aff6b",
    "userId": "1234abcdef",
    "activityMessage": "Stream metadata changed",        
    "event": {
        "event_name": "stream_update",
        "data": {
            "old": {
                "id": "48364aff6b",
                "name": "Golden Nugget \ud83c\udf3b",    
                "description": "revit model",
                "isPublic": false,
                "clonedFrom": null,
                "createdAt": "2021-06-29T09:09:02.993Z", 
                "updatedAt": "2021-07-23T14:17:18.660Z"  
            },
            "new": {
                "id": "48364aff6b",
                "name": "Golden Nugget \ud83c\udf3b",    
              "description": "revit model for cool and 
good times \ud83c\udf1e",
                "isPublic": true
            }
        }
    },
    "server": { ... },
    "stream": { ... },
    "user": { ... },
    "webhook": { ... }
}
```

There are a few key fields that will always be present in the payload including:

- `streamId`: the id of the stream the webhook was added to
- `userId`: the id of the user who triggered the event
- `activityMessage`: a human readable summary about what event has occurred
- `event`: the event that triggered the message; it will always include the `event_name` and `data`, though the structure of the event `data` will vary depending on the event type
- `server`: details about the server that sent the message including its `name`, `description`, and `canonicalUrl`
- `stream`: details about the stream the event was triggered from
- `user`: details about the user who caused the event
- `webhook`: details about the webhook itself