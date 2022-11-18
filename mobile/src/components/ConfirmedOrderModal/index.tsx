import { StatusBar } from 'expo-status-bar';
import { Modal } from 'react-native';

import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Container, OkButton } from './styles';

interface ConfirmedOrderModalProps {
  onOk: () => void;
  visible: boolean;
}

export function ConfirmedOrderModal({
  onOk,
  visible,
}: ConfirmedOrderModalProps) {
  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent>
      <StatusBar style="light" />
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#ffffff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#ffffff" opacity={0.8} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção!
        </Text>
        <OkButton onPress={onOk}>
          <Text color="#d73035" weight="600">
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
