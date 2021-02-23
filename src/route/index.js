import PubSubController from '../controllers/pubsub-controller';

const Route = (router) => {
  router.post('/publish/:topic', PubSubController.publish);
  router.post('/subscribe/push', PubSubController.pushSubscription);
  router.post('/subscribe/:topic', PubSubController.subscription);

  return router;
};

export default Route;
