import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * Formatea una secuencia numérica separando los dígitos de tres en tres DE IZQUIERDA A DERECHA
 * Los primeros 3 números van juntos, luego espacio, luego otros 3, etc.
 * Los números sobrantes quedan al final separados por espacio
 * Ejemplo: "1814321" -> "181 432 1"
 * Ejemplo: "888412128901" -> "888 412 128 901"
 * Ejemplo: "71427321893" -> "714 273 218 93"
 */
export function formatSequence(sequence: string): string {
  // Remover espacios existentes y caracteres no numéricos
  const cleanSequence = sequence.replace(/\s+/g, '').replace(/[^0-9]/g, '')
  
  // Separar de tres en tres de izquierda a derecha
  const groups: string[] = []
  let index = 0
  
  while (index < cleanSequence.length) {
    // Tomar 3 caracteres (o los que queden si son menos)
    groups.push(cleanSequence.slice(index, index + 3))
    index += 3
  }
  
  return groups.join(' ')
}