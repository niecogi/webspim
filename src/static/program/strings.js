import mainProgram from "./ejemplo.s"



var fileReader = new FileReader(mainProgram);
     // var textFromFileLoaded = "";

      fileReader.onload = function (fileLoadedEvent) {
         // textFromFileLoaded = fileLoadedEvent.target.result; 
      };

      
export const DEFAULT_PROGRAM = "#este programa almacena en memoria \n#el minimo, maximo y sus posiciones \n #de los valores incluidos en lista\n.data 0x10000000\nminimo: .word 0\nmaximo: .word 0\npos_min: .word 0\npos_max: .word 0\n.data 0x10001000\nlista: .half 3, -2, 25, 6, -8, 4, 12\nlargo: .word 7 #elementos en lista.\n.globl __start\n.text 0x00400000\n__start:\nli $7, 0\nla $8, largo #direccion de largo\nlw $8, 0($8) #valor de largo\nla $9, lista #direccion de lista\nlh $10, 0($9) #primer elemento de la lista\nadd $11, $10, $0 #$11 minimo, de momento el primer elemento es el menor\nadd $12, $10, $0 #$12 maximo, de momento el primer elemento es el mayor\nadd $13, $0, $0 #$13 posicion del minimo\nadd $14, $0, $0 #$14 posicion del maximo\nbucle: beq $7, $8, fin  #empieza el bucle\naddi $9, $9, 2\naddi $7, $7, 1\nlh $10, 0($9)\nslt $16, $10, $11 #elemento menor que minimo?\nbeq $16, $0, no_menor\nadd $11, $10, $0  #actualizamos el minimo\nadd $13, $7, $0\nno_menor:\nslt $16, $12, $10 #maximo menor que elemento?\nbeq $16, $0, no_mayor\nadd $12, $10, $0 #actualizamos el maximo\nadd $14, $7, $0\nno_mayor:\nj bucle\nfin:\nla $8, minimo #guardamos en memoria los valores encontrados\nsw $11, 0($8)\nsw $12, 4($8)\nsw $13, 8($8)\nsw $14, 12($8)\n.end";
