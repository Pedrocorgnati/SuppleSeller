"use client";
import { Notification, NotificationPriority, NotificationType } from '@/types/notification';
import React, { useEffect, useState } from 'react';
import {
  FaCheck,
  FaCircle,
  FaCreditCard,
  FaExclamationTriangle,
  FaShoppingCart,
  FaTag,
  FaTrash
} from 'react-icons/fa';
// Simple date formatter function; avoid running during SSR to prevent hydration drift
const formatTimeAgo = (date: string) => {
  const now = Date.now();
  const past = new Date(date).getTime();
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return 'Agora mesmo';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minuto(s) atrás`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hora(s) atrás`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} dia(s) atrás`;
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(date));
};

interface NotificationCardProps {
  notification: Notification;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const getTypeIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.ORDER_UPDATE:
      return <FaShoppingCart className="text-orange-500" />;
    case NotificationType.PAYMENT_STATUS:
      return <FaCreditCard className="text-orange-500" />;
    case NotificationType.PROMOTION:
      return <FaTag className="text-purple-500" />;
    case NotificationType.SYSTEM_ALERT:
      return <FaExclamationTriangle className="text-red-500" />;
    default:
      return <FaCircle className="text-gray-500" />;
  }
};

const getTypeColor = (type: NotificationType) => {
  switch (type) {
    case NotificationType.ORDER_UPDATE:
      return 'bg-blue-100 text-blue-800';
    case NotificationType.PAYMENT_STATUS:
      return 'bg-green-100 text-green-800';
    case NotificationType.PROMOTION:
      return 'bg-purple-100 text-purple-800';
    case NotificationType.SYSTEM_ALERT:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityBadge = (priority: NotificationPriority) => {
  const priorityStyles = {
    [NotificationPriority.LOW]: 'bg-gray-100 text-gray-600 border-gray-300',
    [NotificationPriority.NORMAL]: 'bg-blue-100 text-orange-600 border-blue-300',
    [NotificationPriority.HIGH]: 'bg-orange-100 text-orange-600 border-orange-300',
    [NotificationPriority.URGENT]: 'bg-red-100 text-red-600 border-red-300'
  };

  const priorityLabels = {
    [NotificationPriority.LOW]: 'Baixa',
    [NotificationPriority.NORMAL]: 'Normal',
    [NotificationPriority.HIGH]: 'Alta',
    [NotificationPriority.URGENT]: 'Urgente'
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityStyles[priority]}`}>
      {priorityLabels[priority]}
    </span>
  );
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  isSelected,
  onToggleSelect,
  onMarkAsRead,
  onDelete
}) => {
  // Use a deterministic initial value for SSR, then update on the client to avoid hydration mismatch
  const [timeAgo, setTimeAgo] = useState(
    new Date(notification.createdAt).toISOString()
  );

  useEffect(() => {
    setTimeAgo(formatTimeAgo(notification.createdAt));
  }, [notification.createdAt]);

  return (
    <div className={`
      border rounded-lg p-4 transition-all duration-200 hover:shadow-md
      ${notification.isRead ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200 shadow-sm'}
      ${isSelected ? 'ring-2 ring-orange-500 border-orange-500' : ''}
    `}>
        <div className="flex items-start space-x-3">
          {/* Selection Checkbox */}
          <div className="flex items-center pt-1">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggleSelect(notification.id)}
              className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              aria-label={`Selecionar notificação: ${notification.title}`}
            />
          </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2 flex-1">
              <div className="flex-shrink-0">
                {getTypeIcon(notification.type)}
              </div>
              <h3 className={`text-sm font-medium truncate ${notification.isRead ? 'text-gray-900' : 'text-gray-900 font-semibold'
                }`}>
                {notification.title}
              </h3>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" aria-label="Notificação não lida" />
              )}
            </div>

            {/* Priority Badge */}
            <div className="flex-shrink-0 ml-2">
              {getPriorityBadge(notification.priority)}
            </div>
          </div>

          {/* Message */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {notification.message}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Type Badge */}
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notification.type)}`}>
                {notification.type === NotificationType.ORDER_UPDATE && 'Atualização de pedido'}
                {notification.type === NotificationType.PAYMENT_STATUS && 'Status de pagamento'}
                {notification.type === NotificationType.PROMOTION && 'Promoção'}
                {notification.type === NotificationType.SYSTEM_ALERT && 'Alerta do sistema'}
                {!Object.values(NotificationType).includes(notification.type) && notification.type.replace('_', ' ')}
              </span>

              {/* Timestamp */}
              <span
                className="text-xs text-gray-500"
                title={new Date(notification.createdAt).toISOString()}
              >
                {timeAgo}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {!notification.isRead && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium text-orange-600 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 transition-colors"
                  aria-label="Marcar como lida"
                >
                  <FaCheck className="w-3 h-3 mr-1" />
                  Marcar como lida
                </button>
              )}

              <button
                onClick={() => onDelete(notification.id)}
                className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors"
                aria-label="Excluir notificação"
              >
                <FaTrash className="w-3 h-3 mr-1" />
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
