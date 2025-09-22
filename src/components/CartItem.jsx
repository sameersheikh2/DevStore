import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "../utils/api";

export const CartSidebarItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
      <div className="relative w-14 h-14 bg-white rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain p-1"
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight">
          {item.name.length > 35
            ? item.name.substring(0, 35) + "..."
            : item.name}
        </h4>
        <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mt-1">
          {formatCurrency(item.price)}
        </div>

        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Minus className="h-3 w-3" />
          </button>

          <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
            {item.quantity}
          </span>

          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Plus className="h-3 w-3" />
          </button>

          <button
            onClick={() => onRemove(item.id)}
            className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 text-red-500 ml-auto"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="text-sm font-bold text-gray-900 dark:text-white">
        {formatCurrency(item.price * item.quantity)}
      </div>
    </div>
  );
};

export const CartPageItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain p-2"
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
          {item.name}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Unit price: {formatCurrency(item.price)}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg"
          >
            <Minus className="h-4 w-4" />
          </button>

          <span className="px-4 py-2 font-medium text-gray-900 dark:text-white min-w-[3rem] text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="text-lg font-bold text-gray-900 dark:text-white min-w-[5rem] text-right">
          {formatCurrency(item.price * item.quantity)}
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
