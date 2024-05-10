import mqtt from 'mqtt';

export default {
  mqttClient: null as mqtt.MqttClient | null,

  connect(hostname: string, options: mqtt.IClientOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      this.mqttClient = mqtt.connect(hostname, options);
  
      this.mqttClient.on('connect', () => {
        console.log('Conexión exitosa al servidor MQTT');
        resolve();
      });
  
      this.mqttClient.on('error', (error) => {
        console.error('Error de conexión MQTT:', error);
        reject(error);
      });
    });
  },

  subscribe(topic: string): void {
    if (this.mqttClient) {
      this.mqttClient.subscribe(topic, (err) => {
        if (err) {
          console.error('Error al suscribirse al tema MQTT:', err);
        }
      });
    }
  },

  onMessage(callback: (topic: string, message: Buffer) => void): void {
    if (this.mqttClient) {
      this.mqttClient.on('message', callback);
    }
  },

  disconnect(): void {
    if (this.mqttClient) {
      this.mqttClient.end();
      console.log('Desconectado del servidor MQTT');
    }
  }
};