import { PubSub } from '@google-cloud/pubsub';

import PubsubRepository from '../repository/pubsub-repository';
import Response from '../utils/response';
const pubSubClient = new PubSub();

export default class pubsubController {
  /**
   * @function Subscription
   * @description Create subscription
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} subscription JSON Object
   */
  static async subscription(req, res) {
    const topicName = req.params.topic;
    const { url } = req.body;
    const idx = url.lastIndexOf('/');

    if (!idx) return Response.error(400, false, 'Invalid url format', res);

    const pushEndpoint = url.slice(0, idx);
    const subscriptionName = url.slice(idx + 1);

    if (!subscriptionName)
      return Response.error(400, false, 'Invalid url format', res);

    try {
      // Check before creating a topic.
      const topics = await PubsubRepository.listAllTopics(pubSubClient);
      const existTopic = topics.some((topic) => topic.name === topicName);
      if (!existTopic)
        await PubsubRepository.createTopic(pubSubClient, topicName);

      // Check before creating a subscription
      const subscriptions = await PubsubRepository.listSubscriptions(
        pubSubClient
      );
      const existSubscription = subscriptions.some(
        (subscription) => subscription.name === subscriptionName
      );

      if (existSubscription)
        return Response.error(409, false, 'Subscription Resource Exist', res);

      await PubsubRepository.createPushSubscription(
        pubSubClient,
        pushEndpoint,
        topicName,
        subscriptionName
      );

      return Response.subscriptionResponse(200, topicName, url, res);
    } catch (error) {
      return Response.generic(
        500,
        'Unable to pull data :(',
        false,
        error.toString(),
        res
      );
    }
  }

  /**
   * @function publish
   * @description Publish an event
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} published JSON Object
   */
  static async publish(req, res) {
    const { topic } = req.params;
    const payload = {
      topic,
      data: req.body,
    };

    try {
      const messageId = await PubsubRepository.publishMessage(
        pubSubClient,
        topic,
        payload
      );

      return Response.success(
        `Message ${messageId} published :)`,
        200,
        true,
        res
      );
    } catch (error) {
      return Response.generic(
        500,
        "Couldn't publish the received event :(",
        false,
        error,
        res
      );
    }
  }

  /**
   * @function pushSubscription
   * @description Create Subscription
   *
   * @param {Object} req
   * @param {Object} res
   *
   * @returns {Object} subscription JSON Object
   */
  static async pushSubscription(req, res) {
    try {
      const messageResponse = await PubsubRepository.listenForPushMessages(
        req.body.message.data
      );

      return Response.generic(
        200,
        'Message received successfully :)',
        true,
        messageResponse,
        res
      );
    } catch (error) {
      return Response.generic(
        500,
        'Unable to receive data :(',
        false,
        error,
        res
      );
    }
  }
}
