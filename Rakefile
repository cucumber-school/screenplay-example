require 'tmpdir'
namespace :docs do
  task :code do
    pwd = Dir.pwd
    current_branch = `git rev-parse --abbrev-ref HEAD`
    sh 'rm -rf code'
    sh 'mkdir code'
    Dir.chdir(Dir.tmpdir) do
      sh("git clone --quiet #{pwd} screenplay-example") unless Dir.exists?('screenplay-example') && Dir.exists?('screenplay-example/.git')
      Dir.chdir("screenplay-example") do
        puts "Working in #{Dir.pwd}"
        sh "git fetch origin"
        sh "git config advice.detachedHead false"
        sh "git branch -D code || echo no code branch"
        sh "git checkout -b code &> /dev/null"
        commits = `git rev-list code`.split.reverse
        puts commits
        commits.each_with_index do |commit, i|
          commit_message = `git show -s --format=%s #{commit}`.split("\n").first
          dir = "#{pwd}/code/%02d-#{commit_message.downcase.gsub(/\W+/, "-")}" % i
          sh "mkdir #{dir}"
          sh "git checkout #{commit}"
          sh "cp -R . #{dir}"
          sh "rm -rf #{dir}/.git"
        end
      end
    end
  end

  task :html do
    require 'asciidoctor'
    Asciidoctor.convert_file 'index.adoc',
      safe: :unsafe,
      to_dir: '.',
      mkdirs: true
  end
end

task :default => ['docs:code', 'docs:html']
