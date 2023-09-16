module.exports =function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),

        less:{ //configurando o less
            development:{ //local de desenvolvimento dos arquivos
                files: { //arquivos de destino e origem
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production:{ //local onde os arquivos estarão no final(onde o usuário irá acessar)
                options:{ //adicionando a opção de comprimir o css
                    compress:true,
                },
                files: { //arquivos de destino e origem
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
        watch:{ //configurando o watch
            less:{
                files: ['src/styles/**/*.less'], //os arquivos que serão observados
                tasks: ['less:development'] //as tarefas que serão executadas quando houver alteração nos arquivos acima
            },
            html: {
                files: ['src/index.html'], //os arquivos que serão observados
                tasks:['replace:dev'] //as tarefas que serão executadas quando houver alteração nos arquivos acima
            }
        },
        replace: { //configurando o plugin para a substituição do html
            dev: { //local de desenvolvimento dos arquivos
                options: {
                    patterns: [ //palavras que serão encontradas e substituidas
                        {
                            match: 'ENDERECO_DO_CSS', //palavra que deverá ser encontrada
                            replacement: './styles/main.css' //valor pelo qual a palavra será substituída 
                        },
                        {
                            match: 'ENDERECO_DO_JS', //palavra que deverá ser encontrada
                            replacement: '../src/scripts/main.js' //valor pelo qual a palavra será substituída 
                        }
                    ]
                },
                files : [
                    {
                        expand:true,
                        flatten:true,
                        src:['src/index.html'], //o arquivo que queremos que a substituição seja feita
                        dest: 'dev/' //pasta para onde o arquivo deverá ser enviado
                    }
                ]
            },
            dist: { //local de produção dos arquivos
                options: {
                    patterns: [ //palavras que serão encontradas e substituidas
                        {
                            match: 'ENDERECO_DO_CSS', //palavra que deverá ser encontrada
                            replacement: './styles/main.min.css' //valor pelo qual a palavra será substituída 
                        },
                        {
                            match: 'ENDERECO_DO_JS', //palavra que deverá ser encontrada
                            replacement: './scripts/main.min.js' //valor pelo qual a palavra será substituída 
                        }
                    ]
                },
                files : [
                    {
                        expand:true,
                        flatten:true,
                        src:['prebuild/index.html'], //o arquivo que queremos que a substituição seja feita
                        dest: 'dist/' //pasta para onde o arquivo deverá ser enviado
                    }
                ]
            }
        },
        htmlmin: { //configurando o plugin para a compressão do html
            dist: { //local de produção dos arquivos
                options: {
                    removeComments: true, //removendo todos os comentários do arquivo html
                    collapseWhitespace: true //apagando os espaços em branco do arquivo html
                },
                files: {
                    'prebuild/index.html': 'src/index.html' //destino e origem, respectivamente, dos arquivos
                }
            }
        },
        clean: ['prebuild'], //configurando o plugin para apagar a pasta temporária
        uglify: { //configurando o plugin para comprimir o JS
            target: {
                files: {
                    'dist/scripts/main.min.js':'src/scripts/main.js' //destino e origem, respectivamente, dos arquivos
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //importando o plugin do less
    grunt.loadNpmTasks('grunt-contrib-watch'); //importando o plugin para acompanhar as mudanças automaticamente
    grunt.loadNpmTasks('grunt-replace'); //importando o plugin para a substituição do html
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //importando o plugin de compressão do html
    grunt.loadNpmTasks('grunt-contrib-clean'); //importando o plugin para apagar a pasta temporária
    grunt.loadNpmTasks('grunt-contrib-uglify'); //importando o plugin para comprimir o JS


    grunt.registerTask('default', ['watch']); //criando a função default, que irá executar os arquivos de desenvolvimento
    grunt.registerTask('build', ['less:production', 'htmlmin:dist','replace:dist', 'clean','uglify']); //criando a função build, que irá executar os arquivos que o usuário irá acessar e todos os plugins que estão dentro do array
}