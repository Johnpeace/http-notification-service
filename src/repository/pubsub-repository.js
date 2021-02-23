export default class PubSubRepository {
  static async publishMessage(pubSubClient, topic, payload) {
    const dataBuffer = Buffer.from(JSON.stringify(payload));

    try {
      const messageId = await pubSubClient.topic(topic).publish(dataBuffer);
      console.log(`Message ${messageId} published.`);
      return messageId;
    } catch (error) {
      return error.message;
    }
  }

  static listenForPushMessages(payload) {
    try {
      const message = Buffer.from(payload, 'base64').toString('utf-8');
      let parsedMessage = JSON.parse(message);
      console.log(parsedMessage);
      return parsedMessage;
    } catch (error) {
      return error.message;
    }
  }

  static async createPushSubscription(
    pubSubClient,
    pushEndpoint,
    topicName,
    subscriptionName
  ) {
    const options = {
      pushConfig: { pushEndpoint: `${pushEndpoint}/subscribe/push` },
    };

    try {
      await pubSubClient
        .topic(topicName)
        .createSubscription(subscriptionName, options);
    } catch (error) {
      return error.message;
    }
  }

  static async createTopic(pubSubClient, topicName) {
    try {
      const [topic] = await pubSubClient.createTopic(topicName);
      return topic.name;
    } catch (error) {
      return error.message;
    }
  }

  static async listAllTopics(pubSubClient) {
    const [topics] = await pubSubClient.getTopics();
    return topics;
  }

  static async listSubscriptions(pubSubClient) {
    const [subscriptions] = await pubSubClient.getSubscriptions();
    return subscriptions;
  }
}
